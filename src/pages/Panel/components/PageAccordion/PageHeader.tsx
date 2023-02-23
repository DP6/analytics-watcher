import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useHitList } from '../../context/HitList';

interface PageHeaderProps {
  pageId: string;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Header with filter buttons.
 *
 * @param  props.pageId  Page id.
 * @param  props.filterType  type filter.
 * @param  props.setFilterType  filterType setter.
 * @return  JSX.Element.
 */
function PageHeader(props: PageHeaderProps) {
  const { pages } = useHitList();

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', m: 1 }}
    >
      <Typography sx={{ fontWeight: 500 }}>Type</Typography>
      <ToggleButtonGroup
        value={props.filterType}
        onChange={(
          event: React.MouseEvent<HTMLElement, MouseEvent>,
          value: string
        ) => props.setFilterType(value)}
        exclusive
        size="small"
        color="info"
      >
        {/* --------- GAU --------- */}
        <ToggleButton
          title="Google Analytics Universal"
          value="ua-hit"
          sx={{ color: 'inherit' }}
        >
          <Typography sx={{ fontSize: 12 }}>GAU:</Typography>
          <Typography color="info" variant="caption" sx={{ mx: 1 }}>
            {pages.numberOfHitsByType(props.pageId, 'ua-hit')}
          </Typography>
        </ToggleButton>

        {/* --------- GA4 --------- */}
        <ToggleButton
          title="Google Analytics 4"
          value="ga4-hit"
          sx={{ py: 0.3 }}
        >
          <Typography sx={{ fontSize: 12 }}>GA4:</Typography>
          <Typography color="info" variant="caption" sx={{ mx: 1 }}>
            {pages.numberOfHitsByType(props.pageId, 'ga4-hit')}
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export default PageHeader;
