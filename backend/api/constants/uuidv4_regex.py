import re

# This regex pattern matches the standard UUIDv4 format, which consists of five groups of hexadecimal digits separated by hyphens. The pattern ensures that the UUIDv4 has the following characteristics:
# 
# The first group contains 8 hexadecimal digits.
# The second group contains 4 hexadecimal digits.
# The third group starts with the digit 4 followed by 3 hexadecimal digits.
# The fourth group starts with the digits 8, 9, A, or B followed by 3 hexadecimal digits.
# The fifth group contains 12 hexadecimal digits.
# The re.IGNORECASE flag is included to make the pattern case-insensitive, allowing both uppercase and lowercase letters.
# 
# You can use this pattern with the re.match() function to check if a string matches the UUIDv4 format:
# EXAMPLE:

# import re

# uuid_string = "550e8400-e29b-41d4-a716-446655440000"
# if re.match(uuidv4_pattern, uuid_string):
#     print("Valid UUIDv4")
# else:
#     print("Invalid UUIDv4")

uuidv4_pattern = r"^(?i)[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"

# This regex pattern matches a UUIDv4 without hyphens and consists of the following components:
# the (?i) inline modifier makes the pattern case-insensitive. It allows both lowercase and uppercase letters in the hexadecimal characters.
# ^ and $ are the start and end of the line anchors, ensuring that the entire string matches the pattern.
# [0-9a-fA-F] represents a character class that matches any hexadecimal digit (0-9, a-f, A-F).
# {8}, {4}, and {12} specify the exact number of characters in each group of the UUID.
# The pattern is constructed by concatenating the groups of characters without any separators.
uuidv4_pattern_no_hyphen = r"^(?i)[0-9a-f]{8}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{4}[0-9a-f]{12}$"

