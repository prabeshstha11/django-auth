from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    dob = models.DateField(null=True, blank=True)

    # USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "dob"]

    def __str__(self):
        return self.username