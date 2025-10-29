# Script to remove all tutorial code from chore-system.js
import os

file_path = 'js/chore-system.js'

# Read the file
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Original file: {len(lines)} lines")

# Keep only lines up to and including line 11385 (index 11384)
# Then add the proper ending
clean_lines = lines[:11386]

# Add the proper ending
ending = """
        // All tutorial code removed - ready for new robot-guided tutorial implementation

    }; // End of app object

    return app;
})();

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });
} else {
    app.init();
}
"""

clean_lines.append(ending)

# Write the cleaned file
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(clean_lines)

print(f"Cleaned file: {len(clean_lines)} lines written")
print("Tutorial code removed successfully!")
