import Egg, { script } from "@/app/egg/egg";

const snips: script[] = [
  {
    title: "Flux Dev",
    code: `import torch
from diffusers import FluxPipeline
import random

torch.cuda.empty_cache()
torch.backends.cuda.matmul.allow_tf32 = True

pipe = FluxPipeline.from_pretrained('/path/to/flux1-dev-12B', torch_dtype=torch.bfloat16).to('cpu')
pipe.enable_sequential_cpu_offload()
# pipe.enable_attention_slicing("max")

prompt="A Maple leaf in autumn. it has slightly visible circuitry and some of its edges curl slightly. The background is pure white making the leaf stand out."


def gen_img():
    seed=random.randint(1, 5000)
    idx = int(0)
    
    with torch.no_grad():
        returnPipe = pipe(
            prompt,
            height=int(768),
            width=int(768),
            guidance_scale=float(3.2),
            num_images_per_prompt=int(4),
            num_inference_steps=int(32),
            max_sequence_length=int(256),
            generator=torch.Generator("cuda").manual_seed(seed)
        )
        
        images=returnPipe.images
        
    for i in images:
        i.save(f"/path/to/Pictures/{seed}-{idx}.png")
        idx+=1
        
    return gen_img()

gen_img()
 `,
    description: "Generating an image of a Maple leaf."
  },
  {
    title: "FizzBuzz",
    code: `def fizzbuzz(n):
    for i in range(1, n+1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

# Example usage:
fizzbuzz(100)`,
    description: "The classic interview question implemented in Python"
  },
  {
    title: "Quick Sort",
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Example usage:
# print(quicksort([3,6,8,10,1,2,1]))`,
    description: "Efficient sorting algorithm with O(n log n) average case"
  },
  {
    title: "Fibonacci Sequence",
    code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b

# Example usage:
# fibonacci(10)`,
    description: "Generates Fibonacci sequence using tuple unpacking"
  }
];

export default function EggPage() {
  return (
    <Egg codeSnippets={snips} />
  );
};
