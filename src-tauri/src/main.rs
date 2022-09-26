#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::path::{PathBuf};
use std::fs::{create_dir, File, self};
use serde_json::json;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn save_file(file_id: String, title: String, content: String) -> bool {
    // open file with file_id as file name
    let mut path = PathBuf::new();
    path.push(dirs_next::document_dir().unwrap().as_path());
    path.push("Lyrica");
    path.push(file_id);

    // Save contents as json to file
    let data = json!({
        "title": title,
        "content": content
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

    let mut path = PathBuf::new();
    path.push(dirs_next::document_dir().unwrap().as_path());
    path.push("Lyrica");
    path.push(&file_id);

    let create_file = || -> Result<(), std::io::Error> {
        File::create(path)?;
        Ok(())
    };

    if let Err(_err) = create_file() {
        println!("file creation failed");
    }

    file_id
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

fn main() {
    let _save_dir = build_dir();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_file, create_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
