import { Fade, Grow } from '@mui/material';
import Slide from '@mui/material/Slide';
import React from 'react';

const DialogTransition = React.forwardRef(function DialogTransition(props, ref) {
    const { type = 'slide', ...rest } = props;

    if (type === 'fade') return <Fade ref={ref} {...rest} />;
    if (type === 'grow') return <Grow ref={ref} {...rest} />;

    return <Slide direction="up" ref={ref} {...rest} />;
});

export default DialogTransition;