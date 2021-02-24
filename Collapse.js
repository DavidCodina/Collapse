function Collapse(element, config){
  this._config               = config || {};
  this._collapser            = element;
  this._dataTarget           = this._collapser.dataset.bsTarget || this._collapser.hash || null;
  this._target               = document.querySelector(this._dataTarget);
  this._animationTime        = 350; // Based on the transition value of .collapsing, which is 350ms in bootstra.css v5 beta2
  this._init                 = this._init.bind(this);
  this._handleCollapserClick = this._handleCollapserClick.bind(this);
  this._init();
}




Collapse.prototype._init = function(){
  this._collapser.addEventListener('click', this._handleCollapserClick);
};




Collapse.prototype._handleCollapserClick = function(e){
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
  } else {
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
  this._collapser.removeEventListener('click', this._handleCollapserClick);
  return this;
};
