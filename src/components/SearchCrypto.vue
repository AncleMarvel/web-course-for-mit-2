<template>
    <div class="search-card" aria-controls="search-crypto" :data-active="isExpanded" v-click-outside="closeSearch">
        <div class="input-field input-field-search">
            <img class="input-field-search-icon" src="../assets/icon-search.svg" alt="search-icon">
            <input type="text" @click="expandSearch" v-model="coinName" @input="handleInput"
                class="input body-md search-input" placeholder="Search" />
            <p class="input-description search-input-description body-md">
                Select crypto from the list or search the one you need
            </p>
        </div>
        <div class="search-results">
            <div class="search-result search-currency-result" v-for="(currency, idx) in filteredCurrencies" :key="idx">
                <div class="search-currency-result__radio-button" @click="expandSearch">
                    <input type="radio" name="currency" :id="`currency-${currency.id}`" :value="currency"
                        :checked="selectedCurrency?.id === currency?.id" v-model="selectedCurrency"
                        class="search-currency-result__radio-button_input hidden" />
                    <label :for="`currency-${currency.id}`" class="search-currency-result__radio-button_label">
                        <div class="crypto-search-result__icon-wrapper">
                            <img :src="currency.thumb" alt="image-placeholder" class="search-result-icon">
                        </div>
                        <span class="search-result-name body-md-b">
                            {{ currency.symbol }}
                        </span>
                    </label>
                </div>
            </div>
        </div>
        <button @click="save" class="search-btn-save btn btn-primary" type="button">
            Save
        </button>
    </div>
</template>

<script>
import { debounce } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import { getCoinsList } from '../api/coingecko.js'

/**
 * TODO:
 * 1. Search by enter
 * 2. Add a button inside of the input field for search
 * 3. Make the animation of expanding and collapsing the search card
 * 4. Replace the default scrollbar for results
 * 5. When collapsed show the selected currency
 * 6. Add a loading state when it's searching
 * 7. Add hints when types in the search field
 */
export default {
    name: 'SearchCrypto',
    props: {
        selectedCryptoId: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            isExpanded: false,
            coinName: '',
            selectedCurrency: {},
            searchResults: [],
        };
    },
    computed: {
        ...mapGetters({
            alreadySubscribed: 'currencies',
        }),
        filteredCurrencies() {
            return this.searchResults.length > 0 ? this.searchResults.filter(
                (currency) => !this.alreadySubscribed.some((sub) => sub.id === currency.id)
            ) : this.alreadySubscribed;
        },
    },
    methods: {
        ...mapActions({
            updateCurrencyAction: 'updateCurrency',
        }),
        expandSearch() {
            this.isExpanded = true;
        },
        save() {
            this.$emit('selectCrypto', this.selectedCurrency.id);
            this.updateCurrencyAction(this.selectedCurrency);
            this.coinName = '';
            this.searchResults = [];
            this.isExpanded = false;
        },
        closeSearch() {
            this.isExpanded = false;
        },
        async searchCoins(query) {
            const coins = await getCoinsList(query);
            this.searchResults = coins;
        },
        handleInput: debounce(function () {
            if (this.coinName) {
                this.searchCoins(this.coinName);
            } else {
                this.searchResults = [];
            }
        }, 1000),
    },
    created() {
        if (this.selectedCryptoId) {
            this.selectedCurrency = this.alreadySubscribed.find((currency) => currency.id === this.selectedCryptoId);
        }
    },
    emits: ['selectCrypto'],
};
</script>

<style scoped lang="scss">
.search-results {
    max-height: 500px;
    overflow-y: auto;
}

.search-currency-result__radio-button_label {
    align-items: center;
}

.crypto-search-result__icon-wrapper {
    width: 45px;
    height: 45px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--Color-border-border);
    border-radius: 10px;

    img {
        width: 50%;
        height: auto;
        margin: 0;
        border: none;
    }
}
</style>