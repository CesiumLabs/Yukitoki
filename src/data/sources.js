import YukitokiSource from "./YukitokiSource";
import CanvacordSource from "./CanvacordSource";
import QuickMongoSource from "./QMSource";
import SoundCloudSource from "./SoundCloudSource";
import EcoSource from "./EcoSource";
import ChiroSource from "./ChiroSource";
import DiscordPlayerSource from "./DiscordPlayerSource";

const sources = {
    [YukitokiSource.id]: YukitokiSource,
    [CanvacordSource.id]: CanvacordSource,
    [QuickMongoSource.id]: QuickMongoSource,
    [SoundCloudSource.id]: SoundCloudSource,
    [EcoSource.id]: EcoSource,
    [DiscordPlayerSource.id]: DiscordPlayerSource,
    [ChiroSource.id]: ChiroSource
};

export default sources;
