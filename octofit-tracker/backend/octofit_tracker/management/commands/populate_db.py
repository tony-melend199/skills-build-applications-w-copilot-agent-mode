from django.core.management.base import BaseCommand

from octofit_tracker.models import Activity, LeaderboardEntry, Team, UserProfile, Workout


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        UserProfile.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        marvel = Team.objects.create(name='Team Marvel', coach='Jessica Cat', points=260)
        dc = Team.objects.create(name='Team DC', coach='Paul Octo', points=240)

        spider_man = UserProfile.objects.create(
            name='Spider-Man',
            email='spiderman@octofit.test',
            team=marvel,
            favorite_activity='Wall-climbing circuits',
            points=140,
        )
        captain_marvel = UserProfile.objects.create(
            name='Captain Marvel',
            email='captainmarvel@octofit.test',
            team=marvel,
            favorite_activity='Flight sprints',
            points=120,
        )
        superman = UserProfile.objects.create(
            name='Superman',
            email='superman@octofit.test',
            team=dc,
            favorite_activity='Strength training',
            points=130,
        )
        wonder_woman = UserProfile.objects.create(
            name='Wonder Woman',
            email='wonderwoman@octofit.test',
            team=dc,
            favorite_activity='Agility drills',
            points=110,
        )

        for user, activity_type, duration, calories in [
            (spider_man, 'Running', 30, 260),
            (captain_marvel, 'Cycling', 45, 410),
            (superman, 'Strength Training', 50, 480),
            (wonder_woman, 'Circuit Training', 40, 360),
        ]:
            Activity.objects.create(
                user=user,
                activity_type=activity_type,
                duration_minutes=duration,
                calories_burned=calories,
            )

        for rank, user in enumerate([spider_man, superman, captain_marvel, wonder_woman], start=1):
            LeaderboardEntry.objects.create(
                user=user,
                team=user.team,
                points=user.points,
                rank=rank,
            )

        Workout.objects.bulk_create(
            [
                Workout(
                    title='Starter Speed Session',
                    goal='Cardio',
                    intensity='Medium',
                    description='Alternate fast and easy laps for 20 minutes.',
                ),
                Workout(
                    title='Team Power Circuit',
                    goal='Strength',
                    intensity='High',
                    description='Rotate through push-ups, squats, planks, and lunges.',
                ),
            ]
        )

        self.stdout.write(self.style.SUCCESS('Populated OctoFit Tracker sample data.'))
