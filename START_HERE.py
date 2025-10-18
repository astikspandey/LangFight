#!/usr/bin/env python3
import os
import sys
import subprocess

def main():
    print("=" * 60)
    print("🎮 LangFight - Starting Server...")
    print("=" * 60)
    print("")

    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    mainsite_dir = os.path.join(script_dir, 'mainsite')
    server_script = os.path.join(mainsite_dir, 'server.py')

    # Check if mainsite directory exists
    if not os.path.exists(mainsite_dir):
        print(f"✗ Error: mainsite directory not found at {mainsite_dir}")
        sys.exit(1)

    # Check if server.py exists
    if not os.path.exists(server_script):
        print(f"✗ Error: server.py not found at {server_script}")
        sys.exit(1)

    # Change to mainsite directory and run server
    try:
        os.chdir(mainsite_dir)
        print(f"✓ Changed directory to: {mainsite_dir}")
        print("")

        # Run server.py
        subprocess.run([sys.executable, 'server.py'])

    except KeyboardInterrupt:
        print("\n\nServer stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n✗ Error running server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
