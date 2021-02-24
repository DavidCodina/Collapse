/* =============================================================================
                            initialization
============================================================================= */


// Instantiate them one at a time.
// const navCollapseInstance    = new Collapse(document.querySelector('#primary-navbar .navbar-toggler'));
// const collapseLinkInstance   = new Collapse(document.querySelector('#collapse-link'));
// const collapseButtonInstance = new Collapse(document.querySelector('#collapse-button'));


// Or all at once...
const collapseInstances = [];
const collapseElements  = document.querySelectorAll('[data-bs-toggle="collapse"]');
collapseElements.forEach(el => { collapseInstances.push(new Collapse(el)); });


setTimeout(function(){ document.body.classList.remove('transition-none'); }, 1000);
