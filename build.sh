#!/bin/bash

echo "🔧 Building frontend"
cd frontend
npm install
npm run build
cd ..

echo "📦 Collecting static files"
python manage.py collectstatic --noinput

echo "👑 Creating superuser (if not exists)"
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser("admin", "admin@example.com", "adminpass123")
    print("✅ Superuser created: admin / adminpass123")
else:
    print("ℹ️ Superuser already exists")
END
