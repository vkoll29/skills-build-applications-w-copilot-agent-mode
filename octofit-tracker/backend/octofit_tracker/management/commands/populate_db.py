from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.db import transaction

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        with transaction.atomic():
            User.objects.all().delete()
            Team.objects.all().delete()
            Activity.objects.all().delete()
            Leaderboard.objects.all().delete()
            Workout.objects.all().delete()

            marvel = Team.objects.create(name='Marvel')
            dc = Team.objects.create(name='DC')

            ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
            captain = User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel)
            batman = User.objects.create(name='Batman', email='batman@dc.com', team=dc)
            superman = User.objects.create(name='Superman', email='superman@dc.com', team=dc)

            Activity.objects.create(user=ironman, type='Run', duration=30, date='2025-11-12')
            Activity.objects.create(user=batman, type='Swim', duration=45, date='2025-11-12')
            Activity.objects.create(user=superman, type='Bike', duration=60, date='2025-11-12')
            Activity.objects.create(user=captain, type='Walk', duration=20, date='2025-11-12')

            workout1 = Workout.objects.create(name='Chest Day', description='Chest workout for Marvel team')
            workout1.suggested_for.add(marvel)
            workout2 = Workout.objects.create(name='Leg Day', description='Leg workout for DC team')
            workout2.suggested_for.add(dc)

            Leaderboard.objects.create(team=marvel, points=200)
            Leaderboard.objects.create(team=dc, points=180)

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
