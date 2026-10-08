// Pipeline stages and lead sources for the CRM. Class names are written out in full so PurgeCSS keeps them.

export const STATUSES = [
  { id: 'new', label: 'New', badge: 'crm-badge crm-badge--new' },
  { id: 'contacted', label: 'Contacted', badge: 'crm-badge crm-badge--contacted' },
  { id: 'quoted', label: 'Quoted', badge: 'crm-badge crm-badge--quoted' },
  { id: 'won', label: 'Won', badge: 'crm-badge crm-badge--won' },
  { id: 'lost', label: 'Lost', badge: 'crm-badge crm-badge--lost' },
];

export const OPEN_STATUSES = ['new', 'contacted', 'quoted'];

export const SOURCES = {
  quote: 'Quote form',
  contact: 'Contact form',
  order: 'Order',
  discount: 'Discount popup',
  chatbot: 'Chatbot',
  manual: 'Added manually',
};

export const statusOf = (id) => STATUSES.find((s) => s.id === id) || STATUSES[0];
export const sourceLabel = (id) => SOURCES[id] || id;
