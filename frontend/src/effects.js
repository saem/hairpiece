export const setupEffects = freezer => {
  return {
    navigate: location => freezer.trigger('navigate', location)
  };
}
