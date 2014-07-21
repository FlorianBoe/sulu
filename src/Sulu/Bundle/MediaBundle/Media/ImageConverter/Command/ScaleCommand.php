<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\MediaBundle\Media\ImageConverter\Command;

use Imagine\Image\Box;

class ScaleCommand implements CommandInterface
{
    /**
     * {@inheritdoc}
     */
    public function execute(&$image, $parameters)
    {
        $size = $image->getSize();
        $newWidth = isset($parameters['x']) ? intval($parameters['x']) : null;
        $newHeight = isset($parameters['y']) ? intval($parameters['y']) : null;
        $mode = isset($parameters['mode']) ? intval($parameters['mode']) : $image::THUMBNAIL_OUTBOUND;

        if ($newHeight == null) {
            $newHeight = $size->getHeight() / $size->getWidth() * $newWidth;
        }
        if ($newWidth == null) {
            $newWidth = $size->getWidth() / $size->getHeight() * $newHeight;
        }

        $image = $image->thumbnail(new Box($newWidth, $newHeight), $mode);
    }
} 
