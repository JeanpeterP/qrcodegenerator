export const QR_BUILDER_ROUTES = {
    SELECT_TYPE: '/qr/select-type',
    CUSTOMIZE: '/qr/[type]/customize',
    DESIGN: '/qr/[type]/design',
    PREVIEW: '/qr/[type]/preview',
    DOWNLOAD: '/qr/[type]/download',
} as const;

export const getQRBuilderRoute = (route: keyof typeof QR_BUILDER_ROUTES, type?: string) => {
    const path = QR_BUILDER_ROUTES[route];
    return type ? path.replace('[type]', type) : path;
}; 