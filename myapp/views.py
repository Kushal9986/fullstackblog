from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import *
from .serializers import *


#for login /Logout
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser, FormParser




@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = UserData.objects.get(email=email,password=password)
        request.session['user_id'] = user.id
        request.session.set_expiry(1209600) 
        serializer = UserDataSerializer(user)
        print(type(serializer.data))
        return Response(serializer.data)    
    except UserData.DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=400)

@api_view(['GET'])
def protected_view(request):
    user_id = request.session.get('user_id')
    print("user Id ",user_id)
    if not user_id:
        return Response({"error": "Unauthorized"}, status=401)

    try:
        user = UserData.objects.get(id=user_id)
        serializer = UserDataSerializer(user)
        return Response(serializer.data)
    except UserData.DoesNotExist:
        return Response({"error": "Invalid session"}, status=400)
 
        
        
    

@api_view(['POST'])
def logout_view(request):
    try:
        print("LOGOUT sessionid:", request.COOKIES.get("sessionid"))
        print("LOGOUT full session:", dict(request.session.items()))
        if 'user_id' in request.session:
            print(f"Logging out user ID {request.session['user_id']}")
        else:
            print("No user_id in session")
        request.session.flush()
        # user_id = request.session.get['user_id']
        # print("session",user_id)
    except KeyError:
        pass
    return Response({"message": "Logged out"})


def index(request):
    return render(request, 'index.html')











class CreateUserDataAPIView(generics.CreateAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer


# class GetAllUserDataAPIView(generics.ListAPIView):
#     queryset = UserData.objects.all()
#     serializer_class = UserDataSerializer

# class UpdateUserDataAPIView(generics.UpdateAPIView):
#     queryset = UserData.objects.all()
#     serializer_class = UserDataSerializer
#     lookup_field = 'id'

# class DeleteUserDataAPIView(generics.DestroyAPIView):
#     queryset = UserData.objects.all()
#     serializer_class = UserDataSerializer
#     lookup_field = 'id'

# class GetUserByIdDataAPIView(generics.RetrieveAPIView):
#     queryset = UserData.objects.all()
#     serializer_class = UserDataSerializer
#     lookup_field = 'id'

    # def post(self,request):
    #     username = request.data.get("username")
    #     password = request.data.get("password")
    #     user = authenticate(request,username=username, password=password)
    #     if user is not None:
    #         login(request,user)
    #         return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    #     else:
    #         return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
# class LogoutView(APIView):
#     def post(self, request):
#         logout(request)  # Deletes the session
#         return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


class CreateArticleDataAPIView(generics.CreateAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer

class GetAllArticleDataAPIView(generics.ListAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer

class UpdateArticleDataAPIView(generics.UpdateAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer
    lookup_field = 'id'
    parser_classes = [MultiPartParser, FormParser]
    extra_kwargs = {
            'image': {'required': False}
        }

class DeleteArticleDataAPIView(generics.DestroyAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer
    lookup_field = 'id'

class GetArticleByIdDataAPIView(generics.RetrieveAPIView):
    queryset = Articles.objects.all()
    serializer_class = ArticlesSerializer
    lookup_field = 'id'





