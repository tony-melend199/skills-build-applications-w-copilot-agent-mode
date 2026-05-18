from rest_framework.test import APITestCase

from .models import Team, UserProfile


class OctofitApiTests(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Team Marvel', coach='Paul Octo', points=120)
        self.user = UserProfile.objects.create(
            name='Spider-Man',
            email='spiderman@example.com',
            team=self.team,
            favorite_activity='Web cardio',
            points=60,
        )

    def test_api_root_lists_endpoints(self):
        response = self.client.get('/api/')

        self.assertEqual(response.status_code, 200)
        self.assertIn('users', response.data)
        self.assertIn('leaderboard', response.data)

    def test_users_are_serialized_with_string_ids(self):
        response = self.client.get('/api/users/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['name'], self.user.name)
        self.assertIsInstance(response.data[0]['id'], str)
