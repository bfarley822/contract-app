import { createStore } from 'vuex'

export default createStore({
    modules: {

    },
    state: {
        user: {},
        isLoggedIn: false,
        currTab: "home",
        userID: "",
        savedListings: [],
        myListings: []
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setLoggedIn (state) {
            state.isLoggedIn = true;
        },
        setCurrTab (state, tab) {
            state.currTab = tab;
        },
        setUserID (state, ID) {
            state.userID = ID;
        },

        setSavedListings (state, listings) {
            state.savedListings = listings;
        },
        addSavedListing (state, listing) {
            state.savedListings.push(listing);
        },
        removeSavedListing (state, listing) {
            state.savedListings = state.savedListings.filter(currListing => currListing.id !== listing.id);
        },

        setMyListings (state, listings) {
            state.myListings = listings;
        },
        addMyListing (state, listing) {
            state.myListings.push(listing);
        },
        removeMyListing (state, listing) {
            state.myListings = state.myListings.filter(currListing => currListing.id !== listing.id);
        }
    },
    actions: {

    },
    getters: {
        
    }
})