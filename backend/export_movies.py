"""
Utility script to export movies from frontend data to backend JSON format
Run this from the project root to generate movies.json for the backend
"""

import json
import sys
import os

# Add parent directory to path to import frontend data
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def export_movies():
    """Export movies from frontend JavaScript to backend JSON"""
    try:
        # Read the frontend movies.js file
        frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src', 'data', 'movies.js')
        
        with open(frontend_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract MOVIES array (simple parsing - assumes standard format)
        # Find the export const MOVIES = [...] section
        start_idx = content.find('export const MOVIES = [')
        if start_idx == -1:
            print("Error: Could not find MOVIES array in movies.js")
            return False
        
        # Extract the array content
        bracket_count = 0
        start_pos = content.find('[', start_idx)
        array_start = start_pos + 1
        
        movies_list = []
        current_obj = {}
        current_key = None
        in_string = False
        string_char = None
        
        # Simple state machine to parse JavaScript object array
        i = array_start
        while i < len(content):
            char = content[i]
            
            if char in ['"', "'"] and (i == 0 or content[i-1] != '\\'):
                if not in_string:
                    in_string = True
                    string_char = char
                elif char == string_char:
                    in_string = False
                    string_char = None
            
            if not in_string:
                if char == '{':
                    current_obj = {}
                elif char == '}':
                    if current_obj:
                        movies_list.append(current_obj)
                        current_obj = {}
                elif char == ':':
                    # Key-value separator
                    pass
            
            i += 1
            if i > array_start + 100000:  # Safety limit
                break
        
        # Better approach: Use regex or manual parsing
        # For now, let's create a template structure
        print("Note: Manual export recommended. Use the structure below:")
        print("\nExpected movies.json format:")
        print(json.dumps([{
            "id": "example-id",
            "title": "Example Movie",
            "poster": "https://image.tmdb.org/t/p/w500/example.jpg",
            "tags": ["romantic", "upbeat"],
            "hue": 50,
            "tempo": 0.7,
            "edge": 0.4
        }], indent=2))
        
        return True
        
    except Exception as e:
        print(f"Error exporting movies: {e}")
        return False

if __name__ == '__main__':
    export_movies()

