import os
import glob

def delete_migration_files(app_name):
    migrations_path = os.path.join(app_name, 'migrations')
    
    if not os.path.exists(migrations_path):
        print(f"No migrations folder found for app: {app_name}")
        return
    
    for filename in glob.glob(os.path.join(migrations_path, '*.py')):
        if not filename.endswith('__init__.py'):
            try:
                os.remove(filename)
                print(f"Deleted: {filename}")
            except Exception as e:
                print(f"Failed to delete {filename}. Reason: {e}")

# Danh sách các ứng dụng cần xóa migration files
apps = ['apps.service']

for app in apps:
    delete_migration_files(app)