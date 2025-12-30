export const PRODUCT_MESSAGES = {
  CREATED: 'Product created successfully',
  UPDATED: 'Product updated successfully',
  DELETED: 'Product deleted successfully',
  CREATE_ERROR: 'Failed to create product',
  UPDATE_ERROR: 'Failed to update product',
  DELETE_ERROR: 'Failed to delete product',
  LOAD_ERROR: 'Failed to load products',
} as const;

export const PRODUCT_LABELS = {
  PAGE_TITLE: 'Product Manager',
  PAGE_SUBTITLE: 'Manage your products, prices and availability',
  NEW_BUTTON: 'New Product',
  EDIT_BUTTON: 'Edit',
  DELETE_BUTTON: 'Delete',
  EMPTY_STATE: 'No products found',
} as const;

export const DELETE_MODAL_CONFIG = {
  title: 'Delete product',
  message: 'This action cannot be undone. Are you sure?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
} as const;

export const TABLE_HEADERS = {
  NAME: 'Name',
  PRICE: 'Price',
  STATUS: 'Status',
  ACTIONS: 'Actions',
} as const;
