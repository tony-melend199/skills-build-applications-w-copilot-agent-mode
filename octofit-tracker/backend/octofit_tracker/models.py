from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    coach = models.CharField(max_length=100)
    points = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.SET_NULL, related_name='members')
    favorite_activity = models.CharField(max_length=100, blank=True)
    points = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='activities')
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField(default=0)
    logged_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-logged_at']

    def __str__(self):
        return f'{self.user} - {self.activity_type}'


class LeaderboardEntry(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='leaderboard_entries')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboard_entries')
    points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['rank', '-points']

    def __str__(self):
        return f'{self.rank}: {self.user}'


class Workout(models.Model):
    title = models.CharField(max_length=120)
    goal = models.CharField(max_length=120)
    intensity = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
