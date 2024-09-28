import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SvgIconProps } from '@mui/material';

// possible keys for the Icons object
export type IconKeys = 'backIcon' | 'forwardIcon';

// Icons object type
type IconsType = {
  [key in IconKeys]: React.ComponentType<SvgIconProps>;
};

const Icons: IconsType = {
  backIcon: ArrowBackIcon,
  forwardIcon: ArrowForwardIcon,
};

export default Icons;
