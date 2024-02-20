import app from '../app';
import supertest from 'supertest';

const req = supertest(app);

describe('sample test endpoint', () => {
    test('should return response on ping', async () => {
        const res = await req.get('/api/ping');
        expect(res.status).toBe(200);
    })
});