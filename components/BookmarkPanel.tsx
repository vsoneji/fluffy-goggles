import { BookmarkPanelType } from '@/types/schema';
import { Bookmark } from './Bookmark';
import { EditPanelDialog } from './EditPanelDialog';

interface IBookmarkPanelProps extends BookmarkPanelType {
  onChange: (orig: BookmarkPanelType, changed: BookmarkPanelType) => void;
}

export const BookmarkPanel: React.FunctionComponent<IBookmarkPanelProps> = props => {
  return (
    <div>
      <div style={{ width: '100%' }}>
        <span className="panelHeading" style={{ width: '80%' }}>
          {props.label}
        </span>
        <span style={{ alignSelf: 'right' }}>
          <EditPanelDialog panel={props} />
        </span>
      </div>

      <ul className="bookmarkList">
        {props.bookmarks.map((bookmark, i) => {
          return <Bookmark key={i} {...bookmark} />;
        })}
      </ul>
    </div>
  );
};
