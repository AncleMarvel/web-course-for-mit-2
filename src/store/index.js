import { createStore } from 'vuex';
import initialData from '../data/state.js';

function saveStateToLocalStorage(state) {
    localStorage.setItem('state', JSON.stringify(state));
}

function getStateFromLocalStorage() {
    const state = localStorage.getItem('state');
    if (state) {
        try {
            const data = JSON.parse(state);
            return data;
        } catch (error) {
            return null;
        }
    }
}

const dataSource = getStateFromLocalStorage() || initialData;

export default createStore({
    state: dataSource,
    mutations: {
        /**
         * Add new setting to the settings array
         */
        REMOVE_SETTING(state, settingId) {
            state.settings = state.settings.filter(setting => setting.id !== settingId);
            saveStateToLocalStorage(state);
        },
        ADD_SETTING(state, setting) {
            state.settings.push(setting);
            saveStateToLocalStorage(state);
        },
        UPDATE_CURRENCY(state, currency) {
            const currencyIdx = state.currencies.findIndex(curr => curr.id === currency.id);
            if (currencyIdx > -1) {
                state.currencies[currencyIdx] = currency;
                state.currencies = [...state.currencies];
            } else {
                state.currencies.push(currency);
            }
            saveStateToLocalStorage(state);
        }
    },
    actions: {
        /**
         * Remove the setting from the settings array
         */
        removeSetting({ commit }, settingId) {
            // call the mutation
            commit('REMOVE_SETTING', settingId);
        },
        /**
         * Create the setting
         */
        createSetting({ commit }, setting) {
            // call the mutation
            commit('ADD_SETTING', setting);
        },
        updateSetting({ commit }, setting) {
            // call the mutation
            commit('REMOVE_SETTING', setting.id);
            commit('ADD_SETTING', setting);
        },
        updateCurrency({ commit }, currency) {
            // call the mutation
            commit('UPDATE_CURRENCY', currency);
        }
    },
    getters: {
        currencies: (state) => state.currencies,
        settings: (state) => state.settings,
        usedCurrencies: (state) => {
            const arraysOfFoundCurrencies = state.settings?.map(setting => setting.formulas.map(formula => formula.currency))?.flat();
            const arrayWithoutDuplicates = [...new Set(arraysOfFoundCurrencies)];
            return arrayWithoutDuplicates;
        },
        getSettingById: (state) => (settingId) => {
            return state.settings.find(setting => setting.id === settingId);
        },
    },
});