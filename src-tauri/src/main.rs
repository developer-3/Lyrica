#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::path::{PathBuf};
use std::fs::{create_dir, File, self};
use std::vec;
use serde_json::{json};
use serde::{Serialize, Deserialize};

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[derive(Serialize, Deserialize)]
struct Song {
    title: String,
    contents: String
}

#[derive(Serialize, Deserialize)]
struct Project {
    title: String,
    contents: String,
    file_id: String
}

#[tauri::command]
fn save_file(file_id: String, title: String, content: String) -> bool {
    // open file with file_id as file name
    let mut path = get_path();
    path.push(file_id);

    // Save contents as json to file
    let data = json!({
        "title": title,
        "contents": content
    });

    let save = || -> Result<(), std::io::Error> {
        fs::write(path, data.to_string())?;
        Ok(())
    };

    // If successful, return true else false
    if let Err(_err) = save() {
        println!("save was unsuccessful");
        return false;
    }

    return true;
}

#[tauri::command]
fn create_file() -> String {
    let file_id = uuid::Uuid::new_v4().to_string();

    let mut path = get_path();
    path.push(&file_id);

    let create_file = || -> Result<(), std::io::Error> {
        File::create(path)?;
        Ok(())
    };

    if let Err(_err) = create_file() {
        println!("file creation failed");
    }

    save_file(file_id.clone(), String::new(), String::new());

    file_id
}

#[tauri::command]
fn load_all_songs() -> Vec<Project> {
    let mut songs = vec![];

    let path = get_path();

    let mut files: Vec<PathBuf> = vec![];
    for file in fs::read_dir(path).unwrap() {
        files.push(file.unwrap().path());
    }

    for file in files {
        if file.to_str().unwrap().ends_with(&".DS_Store") {
            continue;
        }
        let data = fs::read_to_string(&file).expect("Unable to read file");
        let v: Song = serde_json::from_str(&data).unwrap();

        let file_id = file.as_path().file_stem();
        
        songs.push(Project{title: v.title, contents: v.contents, file_id: file_id.unwrap().to_str().unwrap().to_string() })
    }

    songs
}

fn build_dir() -> PathBuf {
    let mut path = PathBuf::new();
    path.push(dirs_next::document_dir().unwrap().as_path());
    path.push("Lyrica");

    let create = || -> Result<(), std::io::Error> {
        create_dir(&path)?;
        Ok(())
    };

    if let Err(_err) = create() {
        println!("directory already exists");
    } else {
        println!("Creation successful");
    }
    return path;
}

fn get_path() -> PathBuf {
    let mut path = PathBuf::new();
    path.push(dirs_next::document_dir().unwrap().as_path());
    path.push("Lyrica");

    path
}

fn build_menu() -> Menu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit     ⌘q");
    let save = CustomMenuItem::new("save".to_string(), "Save    ⌘s");
    let submenu = Submenu::new("File", Menu::new().add_item(save).add_item(quit));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy)
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_submenu(submenu);

    menu
}

fn main() {
    let _save_dir = build_dir();

    let menu = build_menu();

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![save_file, create_file, load_all_songs])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
