export interface Preferences{
    background: string;
    stroke: Stroke
}

export interface Stroke{
    width: number;
    color: string;
}

export interface Shape {
    type: Cursors;
    points: Point[];
    preferences: Preferences;
}


export interface Point {
    x: number;
    y: number;
}


export interface ShapesDrawn {
    type: string;
    points: Point[];
    id: string;
    preferences: Preferences;
}

export type Cursors = ""|"Pen" 
                        | "Triangle" 
                        | "Square" 
                        | "Pentagon" 
                        | "Text" 
                        | "Pointer"
                        | "Hexagon"
                        | "Circle"
                        | "Star"
                        | "Line"
                        | "Hepatgon"
                        | "Delete"
                        ;