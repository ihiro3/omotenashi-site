export const postImageCatalog = {
  landingPageGuide:
    'https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  usefulResourcesToCreateWebsites:
    'https://images.unsplash.com/photo-1637144113536-9c6e917be447?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
  customizeAstroWindBrand:
    'https://images.unsplash.com/photo-1546984575-757f4f7c13cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  astrowindTemplateInDepth:
    'https://images.unsplash.com/photo-1534307671554-9a6d81f4d629?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1651&q=80',
  getStartedWebsiteWithAstroTailwindCss:
    'https://images.unsplash.com/photo-1516996087931-5ae405802f9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
} as const;

export const resolvePostImage = (image?: string) => {
  if (!image) return undefined;
  return image in postImageCatalog ? postImageCatalog[image as keyof typeof postImageCatalog] : image;
};
