"use client";

export default function FilterShell({ children }) {
    return (
        <div>
            <input type="text" 
              placeholder="Filter dishes..." 
              aria-label="Filter dishes"
            />
            {children}
        </div>
    );
}