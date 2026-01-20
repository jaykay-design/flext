interface IFlextInfo {
    container?: HTMLElement | undefined;
    textarea?: HTMLTextAreaElement | undefined;
}
declare function setup(e: CustomEvent<IFlextInfo>): void;
export { setup, IFlextInfo };
