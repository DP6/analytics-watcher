import React from 'react';

import Paper from '@mui/material/Paper';

// Icons
import IconButton from '@mui/material/IconButton';
import Filter4Icon from '@mui/icons-material/Filter4';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AppsIcon from '@mui/icons-material/Apps';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReportIcon from '@mui/icons-material/Report';
import ClearIcon from '@mui/icons-material/Clear';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useHitList } from '../../context/HitList';
import HitTableContainer from './HitTableContainer';
import { HitDataModel } from '../../models/HitDataModel';

/**
 * Render Hit type icon
 */
const eventTypeIconImg: { [key: string]: JSX.Element } = {
  event: <FlashOnIcon fontSize="small" />,
  pageview: <FindInPageIcon fontSize="small" />,
  appview: <AppsIcon fontSize="small" />,
  transaction: <MonetizationOnIcon fontSize="small" />,
  item: <ShoppingBasketIcon fontSize="small" />,
  social: <ShareIcon fontSize="small" />,
  exception: <ReportIcon fontSize="small" />,
  timing: <TimelapseIcon fontSize="small" />,
  analytics4: <Filter4Icon fontSize="small" />,
};

interface HitAccordionProps {
  hitParameters: { [key: string]: string };
  contentTitle: string;
  eventTypeIcon: string;
  hitListKey: string;
  expanded: boolean;
  pageId: string;
}

/**
 * Render a Hit component, with data from one single hit.
 *
 * @param  props.hitParameters  Object formed from query string.
 * @param  props.contentTitle Hit title.
 * @param  props.eventTypeIcon  Type of hit.
 * @param  props.hitListKey key ID of hit.
 * @param  props.expanded Hit accordion state (expanded or not).
 * @param  props.pageId Page id.
 * @returns  JSX.Element.
 */
function HitAccordion(props: HitAccordionProps) {
  const { setPages } = useHitList();
  return (
    <List sx={{ mx: 2, py: 0, my: 1 }} component={Paper} elevation={3}>
      <ListItemButton
        sx={{
          px: 2,
          py: 0,
          border: 1,
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }}
        onClick={() =>
          setPages(oldPages => {
            let newPages = new HitDataModel(oldPages);
            newPages.toggleHitExpanded(props.pageId, props.hitListKey);
            return newPages;
          })
        }
      >
        {/* --------- Event Icon --------- */}
        <ListItemIcon>
          {props.expanded ? <ExpandLess /> : <ExpandMore />}
          {props.eventTypeIcon !== '' && eventTypeIconImg[props.eventTypeIcon]}
        </ListItemIcon>

        {/* --------- Title--------- */}
        <ListItemText sx={{ ml: 1 }} primary={props.contentTitle} />

        {/* --------- Delete button --------- */}
        <div onClick={event => event.stopPropagation()}>
          <IconButton
            title="Delete"
            onClick={() =>
              setPages(oldPages => {
                let newPages = new HitDataModel(oldPages);
                newPages.removeHit(props.pageId, props.hitListKey);
                return newPages;
              })
            }
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </div>
      </ListItemButton>

      {/* --------- Hit Table Container --------- */}
      <Collapse in={props.expanded} timeout={0} mountOnEnter unmountOnExit>
        <HitTableContainer hitParameters={props.hitParameters} />
      </Collapse>
    </List>
  );
}

export default HitAccordion;
