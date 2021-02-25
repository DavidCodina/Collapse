/* =============================================================================
                            initialization
============================================================================= */


setTimeout(function(){ document.body.classList.remove('transition-none'); }, 1000);


// Instantiate them one at a time...
// const collapseExample = new Collapse(document.querySelector('#collapse-example'));
// const navMenu         = new Collapse(document.querySelector('#nav-menu'));


// Or all at once...
const collapseInstances = [];
const collapseElements  = document.querySelectorAll('.collapse');
collapseElements.forEach(collapse => { collapseInstances.push(new Collapse(collapse)); });
