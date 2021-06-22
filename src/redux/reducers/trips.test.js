import { expect } from '@jest/globals';
import { test } from 'jest-circus';
import { describe } from 'yargs';
import trips from './trips.reducer.js';


describe('Trips reducer', () => {
    test('Should set proper default state', () => {
        const newState = trips(undefined, {});
        expect(newState.alertMessage).not.toBeUndefined();
        expect(newState.alertType).not.toBeUndefined();
    });

    test('Should set an alert and then clear it out', () => {

        const action = {
            type: 'SET_ALERT',
            payload: {
                message: 'Test Alert!',
                alert: 'alert-success'
            }
        }

        const newState = trips(undefined, action);
        expect(newState.alertMessage).toBe('Test Alert!');
        expect(newState.alertType).toBe('alert-success');

        const action2 = {
            type: 'CLEAR_ALERT'
        }

        const newState2 = trips(newState, action2);
        expect(newState2.alertMessage).toBeNull();
        expect(newState2.alertType).toBeNull();
    });
})
