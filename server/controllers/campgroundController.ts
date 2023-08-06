import { NextFunction, Request, Response } from 'express';

import { asyncHandler } from '../utils';
import Campground from '../models/campground';

export const getCampgrounds = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  }
);

export const createCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    /*
    let images: Array<{ url: string; filename: string }> = req.files?.map(
      (file) => ({ url: file.path, filename: file.filename })
    );
    Unable to proceed with the above mapping function as there currently seems to be 
    an issue with req.files array/dictionary. 
    Most of the array functions of req.files are not working and popping an error similar to below.
    "This expression is not callable.
    Not all constituents of type 
    'File[] | (<U>(callbackfn: (value: File, index: number, array: File[]) => U, thisArg?: any) => 
      U[])' are callable.
    Type 'File[]' has no call signatures.ts(2349)"
    
    As a workaround, the maximum images to be uploaded has been set as 5. Once the issue is resolved 
    or a better workaround is found, the code will be updated accordingly. 
    */
    const newCampground = new Campground({ ...req.body });

    try {
      const img0 = {
        url: (req.files![0 as keyof typeof req.files] as any).path,
        filename: (req.files![0 as keyof typeof req.files] as any).filename,
      };
      newCampground.images?.push(img0);
      const img1 = {
        url: (req.files![1 as keyof typeof req.files] as any).path,
        filename: (req.files![1 as keyof typeof req.files] as any).filename,
      };
      newCampground.images?.push(img1);
      const img2 = {
        url: (req.files![2 as keyof typeof req.files] as any).path,
        filename: (req.files![2 as keyof typeof req.files] as any).filename,
      };
      newCampground.images?.push(img2);
      const img3 = {
        url: (req.files![3 as keyof typeof req.files] as any).path,
        filename: (req.files![3 as keyof typeof req.files] as any).filename,
      };
      newCampground.images?.push(img3);
      const img4 = {
        url: (req.files![4 as keyof typeof req.files] as any).path,
        filename: (req.files![4 as keyof typeof req.files] as any).filename,
      };
      newCampground.images?.push(img4);
    } catch (err) {
      next;
    }

    await newCampground.save();
    res.json({
      message: 'Campground created successfully.',
    });
  }
);

export const editCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id);
    if (!campground) return res.json({ error: 'Campground Not Found!' });

    await Campground.findByIdAndUpdate(
      _id,
      { ...req.body },
      { runValidators: true }
    );

    try {
      const img0 = {
        url: (req.files![0 as keyof typeof req.files] as any).path,
        filename: (req.files![0 as keyof typeof req.files] as any).filename,
      };
      campground.images?.push(img0);
      const img1 = {
        url: (req.files![1 as keyof typeof req.files] as any).path,
        filename: (req.files![1 as keyof typeof req.files] as any).filename,
      };
      campground.images?.push(img1);
      const img2 = {
        url: (req.files![2 as keyof typeof req.files] as any).path,
        filename: (req.files![2 as keyof typeof req.files] as any).filename,
      };
      campground.images?.push(img2);
      const img3 = {
        url: (req.files![3 as keyof typeof req.files] as any).path,
        filename: (req.files![3 as keyof typeof req.files] as any).filename,
      };
      campground.images?.push(img3);
      const img4 = {
        url: (req.files![4 as keyof typeof req.files] as any).path,
        filename: (req.files![4 as keyof typeof req.files] as any).filename,
      };
      campground.images?.push(img4);
    } catch (err) {
      next;
    }

    await campground.save();

    res.json({
      message: 'Campground modified successfully.',
    });
  }
);

export const deleteCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    await Campground.findByIdAndDelete(_id);
    res.json({
      message: 'Campground deleted successfully.',
    });
  }
);

export const getCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id)
      .populate({ path: 'reviews', populate: { path: 'author' } })
      .populate('author');
    if (!campground) return res.json({ error: 'Campground not found!' });
    res.json(campground);
  }
);
