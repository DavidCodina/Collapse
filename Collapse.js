function Collapse(element, config){
  const instanceExists = Object.getPrototypeOf(this)._getInstance(element);
  if (instanceExists){ throw "A Collapse instance has already been created for that element."; }

  this._config        = config || {};
  this._collapser     = element;
  this._dataTarget    = this._collapser.dataset.bsTarget || this._collapser.hash || null;
  this._target        = document.querySelector(this._dataTarget);
  this._animationTime = 350;  // Based on the transition value of .collapsing, which is 350ms in bootstra.css v5 beta2
  this._init          = this._init.bind(this);
  this.toggle         = this.toggle.bind(this);
  this.destroy        = this.destroy.bind(this);

  Object.getPrototypeOf(this)._instances.push(this); // Store instance reference on prototype.
  this._init();
}




Collapse.prototype._instances = [];




Collapse.prototype._init = function(){
  this._collapser.addEventListener('click', this.toggle);
};




// Static getInstances
Collapse.getInstances = function(){
  const instancesCopy = this.prototype._instances.slice();
  return instancesCopy;
};




// For internal use only such that in the contructor one can do this:
// Object.getPrototypeOf(this)._getInstance()
// instead of using Collapse.getInstance(). Why?
// It's better not to rely on the actual constructor name.
Collapse.prototype._getInstance = function(element){
  if (!element){ throw "element must be passed as an argument to _getInstance."; } // Avoid false negatives.
  for (let i = 0; i < this._instances.length; i++){
    const instance = this._instances[i];
    if (element === instance._collapser){ return instance; }
  }
  return null;
};




// Static getInstance
Collapse.getInstance = function(element){
  if (!element){ throw "element must be passed as an argument to getInstance."; } // Avoid false negatives.
  for (let i = 0; i < this.prototype._instances.length; i++){
    const instance = this.prototype._instances[i];
    if (element === instance._collapser){ return instance; }
  }
  return null;
};




Collapse.prototype.toggle = function(e){
  if (e){ e.preventDefault(); }
  if (!this._target){ return; }
  const isShown  = this._target.classList.contains('show') || this._target.classList.contains('collapsing');


  if (!isShown){
    this._target.classList.remove('collapse');
    this._target.classList.add('collapsing');
    this._target.style.height = 0;
    this._target.classList.remove('collapsed');
    setTimeout(() => {
      this._target.classList.remove('collapsing');
      this._target.classList.add('collapse', 'show');
      this._target.style.height = '';
    }, this._animationTime);
     this._target.style.height = this._target.scrollHeight + 'px';
  }
  else {
    this._target.style.height = `${this._target.getBoundingClientRect().height}px`;
    void(this._target.offsetHeight); //force reflow.
    this._target.classList.add('collapsing');
    this._target.classList.remove('collapse', 'show');
    this._target.style.height = '';
    setTimeout(() => {
      this._target.classList.remove('collapsing');
      this._target.classList.add('collapse');
    }, this._animationTime);
  }
};




Collapse.prototype.destroy = function(){
  // Remove all associated event listeners.
  this._collapser.removeEventListener('click', this.toggle);

  // Remove the associated instance from _instances.
  const instanceIndex = this._instances.map(instance => instance._collapser).indexOf(this._collapser);
  if (instanceIndex > -1){ this._instances.splice(instanceIndex, 1); }
  return this;
};
