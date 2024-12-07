export type FrameType = 'none' | 'simple' | 'rounded' | 'fancy' | 'chat' | 'colorful';

export interface Frame {
    type: string;
    svg?: string;
} 