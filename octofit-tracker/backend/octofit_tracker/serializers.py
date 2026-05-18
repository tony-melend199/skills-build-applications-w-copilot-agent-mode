from rest_framework import serializers

from .models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class StringIdModelSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)


class TeamSerializer(StringIdModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'coach', 'points']


class UserProfileSerializer(StringIdModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id', 'name', 'email', 'team', 'team_name', 'favorite_activity', 'points']


class ActivitySerializer(StringIdModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_name', 'activity_type', 'duration_minutes', 'calories_burned', 'logged_at']


class LeaderboardEntrySerializer(StringIdModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = LeaderboardEntry
        fields = ['id', 'rank', 'points', 'user', 'user_name', 'team', 'team_name']


class WorkoutSerializer(StringIdModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'title', 'goal', 'intensity', 'description']
