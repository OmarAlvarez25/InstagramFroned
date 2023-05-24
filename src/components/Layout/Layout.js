// Local Components
import { Sidebar, SEO } from '..';

// Styles
import s from './Layout.module.scss';

export function Layout({ children, pageTitle }) {
  return (
    <div>
      <SEO pageTitle={pageTitle} />
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>{children}</div>
      </div>
    </div>
  );
}
