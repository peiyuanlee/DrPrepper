export const globals = {
    progress: 0, // Initial progress value
    get disabled() {
      return this.progress === 1; // Computed property for `disabled`
    },
  };