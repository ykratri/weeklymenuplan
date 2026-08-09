export type Dictionary = {
  common: {
    ingredientsLabel: string;
    viewSource: string;
    deleteAria: string;
    editAria: string;
    editButton: string;
    confirmDelete: string;
    tagsLabel: string;
    tagsHelp: string;
    addManualPlaceholder: string;
    addManualButton: string;
    back: string;
    backToHome: string;
    noSearchResults: string;
  };
  nav: {
    home: string;
    shopping: string;
    shelf: string;
    discover: string;
  };
  home: {
    appName: string;
    tagline: string;
    howToUse: string;
    shoppingTitle: string;
    shoppingDesc: string;
    shelfTitle: string;
    shelfDesc: string;
    discoverTitle: string;
    referenceTitle: string;
  };
  shelf: {
    title: string;
    addButton: string;
    searchPlaceholder: string;
    emptyPrefix: string;
    emptyLinkLabel: string;
    emptySuffix: string;
  };
  shelfAdd: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    ingredientsLabel: string;
    ingredientsHelp: string;
    ingredientsPlaceholder: string;
    sourceLabel: string;
    sourcePlaceholder: string;
    submit: string;
  };
  shelfEdit: {
    title: string;
    submit: string;
  };
  reference: {
    title: string;
    addButton: string;
    searchPlaceholder: string;
    desc: string;
    empty: string;
  };
  referenceAdd: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    sourceLabel: string;
    sourceHelp: string;
    sourcePlaceholder: string;
    ingredientsLabelOptional: string;
    ingredientsHelp: string;
    ingredientsPlaceholder: string;
    submit: string;
  };
  referenceEdit: {
    title: string;
    submit: string;
  };
  shopping: {
    title: string;
    emptyPrefix: string;
    subtitle: string;
    pickPrompt: string;
    resultTitle: string;
    copy: string;
    copied: string;
    noIngredients: string;
  };
  discover: {
    title: string;
    intro: string;
    manageReference: string;
    customPlaceholder: string;
    searchButton: string;
    themeLabel: string;
    changeTheme: string;
    loading: string;
    emptyPrefix: string;
    emptySuffix: string;
    addToReference: string;
    doneTitle: string;
    addedCount: string;
    retryTheme: string;
    pickAnotherTheme: string;
    saveBadge: string;
    skipBadge: string;
    swipeHint: string;
  };
  auth: {
    emailLabel: string;
    passwordLabel: string;
    loginTitle: string;
    loginSubtitle: string;
    signInButton: string;
    noAccountPrefix: string;
    signUpLink: string;
    signupTitle: string;
    signupSubtitle: string;
    signUpButton: string;
    haveAccountPrefix: string;
    signInLink: string;
    signOutButton: string;
    confirmEmailNotice: string;
  };
  guide: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      desc: string;
      href: string;
      linkLabel: string;
    }[];
    footer: string;
  };
};
