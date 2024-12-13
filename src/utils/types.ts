export interface IGetBoardDataResponse {
    kernel: string;
    hostname: string;
    system: string;
    model: string;
    board_name: string;
    rootfs_type: string;
    release: {
        distribution: string;
        version: string;
        revision: string;
        target: string;
        description: string;
    };
}
