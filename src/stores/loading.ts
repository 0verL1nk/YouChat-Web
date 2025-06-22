import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loading: false,
    loadingCount: 0,
  }),

  actions: {
    showLoading() {
      this.loadingCount++
      this.loading = true
    },

    hideLoading() {
      this.loadingCount--
      if (this.loadingCount <= 0) {
        this.loadingCount = 0
        this.loading = false
      }
    },
  },
})
