import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { HitDataModel } from '../../models/HitDataModel';

import HitAccordion from '../HitAccordion';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useHitList } from '../../context/HitList';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import PageHeader from './PageHeader';

interface PageAccordionProps {
  pageId: string;
  pageUrl: string;
  page: Page;
}

/**
 * Render a Hit component, with data from one single hit
 *
 * @param  props.pageId  Page id.
 * @param  props.pageUrl  Page URL.
 * @param  props.page  Current page.
 * @return  JSX.Element.
 */
function PageAccordion(props: PageAccordionProps) {
  const { pages, setPages } = useHitList();
  const [filterType, setFilterType] = React.useState<string>('ua-hit');

  return (
    <List sx={{ mx: 1, py: 0, mb: 3 }} component={Paper} elevation={3}>
      {/* --------- Accordion Header --------- */}
      <ListItemButton
        sx={{
          px: 2,
          py: 0.5,
          border: 1,
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }}
        onClick={() =>
          setPages(oldPages => {
            let newPages = new HitDataModel(oldPages);
            newPages.togglePageExpanded(props.pageId);
            return newPages;
          })
        }
      >
        {/* --------- Icons - Toggle and favIcon --------- */}
        <ListItemIcon>
          {props.page.expanded ? <ExpandLess /> : <ExpandMore />}
          {props.page.favIconUrl !== '' && (
            <Box
              component="img"
              sx={{ height: 20, width: 20 }}
              src={props.page.favIconUrl}
            />
          )}
        </ListItemIcon>

        {/* --------- Title --------- */}
        <ListItemText primary={props.pageUrl} />

        {/* --------- Delete button --------- */}
        <div onClick={event => event.stopPropagation()}>
          <IconButton
            title="Delete"
            onClick={() =>
              setPages(oldPages => {
                let newPages = new HitDataModel(oldPages);
                newPages.removePage(props.pageId);
                return newPages;
              })
            }
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </div>
      </ListItemButton>

      {/* --------- Accordion Body --------- */}
      <Collapse in={props.page.expanded} timeout={0} mountOnEnter unmountOnExit>
        {/* --------- Page Header --------- */}
        <PageHeader
          pageId={props.pageId}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        {/* --------- Hits --------- */}
        {pages
          .filterHitsByType(props.pageId, filterType)
          .hits.reverse()
          .map(entry => {
            return (
              <HitAccordion
                hitParameters={entry.hitParameters}
                contentTitle={entry.contentTitle}
                eventTypeIcon={entry.eventType}
                hitListKey={entry.hitId}
                key={entry.hitId}
                expanded={entry.expanded}
                pageId={props.pageId}
              />
            );
          })}
      </Collapse>
    </List>
  );
}

export default PageAccordion;
