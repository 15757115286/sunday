import webpack from 'webpack';

type Chunk = webpack.compilation.Chunk;
type CustomChunk = {
    contentHash: {
        javascript?: string;
    }
}

export type MergedChunk = Chunk & CustomChunk;
