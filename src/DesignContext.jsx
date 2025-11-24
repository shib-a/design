import React, { createContext, useState } from 'react';

export const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
    const [designState, setDesignState] = useState({
        color: '#ffffff', // Shirt color
        size: 'M', // Shirt size
        designs: [], // Array of design objects: { id, src, left, top, scaleX, scaleY, angle, etc. }
    });

    const updateDesign = (updates) => {
        setDesignState((prev) => ({ ...prev, ...updates }));
    };

    // Helper to add a new design (e.g., from image upload)
    const addDesign = (newDesign) => {
        setDesignState((prev) => ({
            ...prev,
            designs: [...prev.designs, { id: Date.now(), ...newDesign }],
        }));
    };

    // Helper to update a specific design's properties (e.g., position after drag)
    const updateDesignElement = (id, props) => {
        setDesignState((prev) => ({
            ...prev,
            designs: prev.designs.map((design) =>
                design.id === id ? { ...design, ...props } : design
            ),
        }));
    };

    return (
        <DesignContext.Provider value={{ designState, updateDesign, addDesign, updateDesignElement }}>
            {children}
        </DesignContext.Provider>
    );
};