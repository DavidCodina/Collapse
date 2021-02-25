function Collapse(collapse, config){
  const instanceExists = Object.getPrototypeOf(this)._getInstance(collapse);
  if (instanceExists){ throw "A Collapse instance has already been created for that collapse element."; }

  this._collapse      = collapse;
  this._config        = config || {};
  this._togglers      =
    [].slice.call(document.querySelectorAll('[data-bs-toggle="collapse"][data-bs-target="#' + collapse.id + '"]')).concat(
    [].slice.call(document.querySelectorAll('[data-bs-toggle="collapse"][href="#'           + collapse.id + '"]'))
  );
  this._animationTime = 350; // Based on the transition value of .collapsing, which is 350ms in bootstrap.css v5 beta2
  this._init          = this._init.bind(this);
  this.show           = this.show.bind(this);
  this.hide           = this.hide.bind(this);
  this.toggle         = this.toggle.bind(this);
  this.destroy        = this.destroy.bind(this);

  Object.getPrototypeOf(this)._instances.push(this);
  this._init();
}




Collapse.prototype._instances = [];




Collapse.prototype._init = function(){
  this._togglers.forEach(toggler => {
    toggler.addEventListener('click', this.toggle);
  });
};




// Static getInstances
Collapse.getInstances = function(){
  const instancesCopy = this.prototype._instances.slice();
  return instancesCopy;
};




// For internal use only such that the contructor can do this:
// Object.getPrototypeOf(this)._getInstance()
// One could instead use Collapse.getInstance(), but it's better not
// to rely on the actual constructor name.
Collapse.prototype._getInstance = function(element){
  if (!element){ throw "element must be passed as an argument to _getInstance."; } // Avoid false negatives
  for (let i = 0; i < this._instances.length; i++){
    const instance = this._instances[i];
    if (element === instance._collapse){ return instance; }
  }
  return null;
};




// Static getInstance
Collapse.getInstance = function(element){
  if (!element){ throw "element must be passed as an argument to getInstance."; } // Avoid false negatives.
  for (let i = 0; i < this.prototype._instances.length; i++){
    const instance = this.prototype._instances[i];
    if (element === instance._collapse){ return instance; }
  }
  return null;
};




Collapse.prototype.show = function(e){
  if (e){ e.preventDefault(); }
  const isShown  = this._collapse.classList.contains('show') || this._collapse.classList.contains('collapsing');
  if (!isShown){
    this._collapse.classList.remove('collapse');
    this._collapse.classList.add('collapsing');
    this._collapse.style.height = 0;
    this._collapse.classList.remove('collapsed');
    setTimeout(() => {
      this._collapse.classList.remove('collapsing');
      this._collapse.classList.add('collapse', 'show');
      this._collapse.style.height = '';
    }, this._animationTime);
     this._collapse.style.height = this._collapse.scrollHeight + 'px';
  }
  return this;
};




Collapse.prototype.hide = function(e){
  if (e){ e.preventDefault(); }
  const isShown  = this._collapse.classList.contains('show') || this._collapse.classList.contains('collapsing');

  if (isShown) {
    this._collapse.style.height = `${this._collapse.getBoundingClientRect().height}px`;
    void(this._collapse.offsetHeight); //force reflow.
    this._collapse.classList.add('collapsing');
    this._collapse.classList.remove('collapse', 'show');
    this._collapse.style.height = '';
    setTimeout(() => {
      this._collapse.classList.remove('collapsing');
      this._collapse.classList.add('collapse');
    }, this._animationTime);
  }
  return this;
};




Collapse.prototype.toggle = function(e){
  if (e){ e.preventDefault(); }
  const isShown  = this._collapse.classList.contains('show') || this._collapse.classList.contains('collapsing');
  if (!isShown){ this.show(); }
  else {         this.hide(); }
};




Collapse.prototype.destroy = function(){
  this._togglers.forEach(toggler => toggler.removeEventListener('click', this.toggle));

  const instanceIndex = this._instances.map(instance => instance._collapse).indexOf(this._collapse);
  if (instanceIndex > -1){ this._instances.splice(instanceIndex, 1); }
  return this;
};
