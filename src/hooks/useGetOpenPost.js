import React, { useState } from 'react';
import { useEffect } from 'react';

const useGetOpenPost = () => {
    const [open, setOpen] = useState();
    return [open, setOpen];
};

export default useGetOpenPost;