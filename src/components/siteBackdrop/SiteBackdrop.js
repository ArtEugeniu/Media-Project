import './SiteBackdrop.scss';

function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <span className="site-backdrop__base" />
      <span className="site-backdrop__grid" />
      <span className="site-backdrop__mesh site-backdrop__mesh--cyan" />
      <span className="site-backdrop__mesh site-backdrop__mesh--blue" />
      <span className="site-backdrop__mesh site-backdrop__mesh--violet" />
      <span className="site-backdrop__beam" />
      <span className="site-backdrop__dust" />
      <span className="site-backdrop__vignette" />
    </div>
  );
}

export default SiteBackdrop;
