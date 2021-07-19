import YukitokiSource from "./YukitokiSource";
import CanvacordSource from "./CanvacordSource";
import QuickMongoSource from "./QMSource";
import SoundCloudSource from "./SoundCloudSource";
import EcoSource from "./EcoSource";

const sources = {
    [YukitokiSource.id]: YukitokiSource,
    [CanvacordSource.id]: CanvacordSource,
    [QuickMongoSource.id]: QuickMongoSource,
    [SoundCloudSource.id]: SoundCloudSource,
    [EcoSource.id]: EcoSource
};

export default sources;
